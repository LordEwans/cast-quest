// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20Wager is Ownable {
    IERC20 public wagerToken;
    address private _owner;
    
    bytes32 private zeroHash =
        0x290decd9548b62a8d60345a988386fc84ba6bc95484008f6362f93160ef3e563;

    // Struct to store game information
    struct Game {
        uint256 gameId;
        address player1;
        address player2;
        uint256 wagerAmount;
        GameState gameState;
        address winner;
    }

    enum GameState { Open, Accepted, Cancelled, Finished }

    // Mapping to store games by their gameId
    mapping(uint256 => Game) public games;

    event WagerProposed(uint256 gameId, address indexed player1, uint256 amount);
    event WagerAccepted(uint256 gameId, address indexed player2);
    event WagerCancelled(uint256 gameId, address indexed cancellingParty);
    event WagerFinished(uint256 gameId, address indexed winner);
    event WagerClaimed(uint256 gameId, address indexed winner);

    constructor(address _wagerToken) Ownable(msg.sender) {
        wagerToken = IERC20(_wagerToken);
        _owner = msg.sender;
    }

    // Function to create a new game
    function createNewGame(uint256 _gameId) internal {
        games[_gameId] = Game({
            gameId: _gameId,
            player1: address(0), // Initialize with default values
            player2: address(0),
            wagerAmount: 0,
            gameState: GameState.Open,
            winner: address(0)
        });
    }

    // Player 1 proposes a wager on a specific game
    // gameId >= 1, gameIDs are unique
    function proposeWager(uint256 _gameId, uint256 _amount) external {
        require(
            keccak256(abi.encode(games[_gameId].gameId)) == zeroHash,
            "Wager already exists"
        );
        createNewGame(_gameId);
        Game storage game = games[_gameId]; // Get the game by its ID
        require(game.gameState == GameState.Open, "Wager already in progress");
        require(_amount > 0, "Wager amount must be greater than 0");

        game.player1 = msg.sender;
        game.wagerAmount = _amount;
        game.gameState = GameState.Open;

        require(wagerToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        emit WagerProposed(_gameId, msg.sender, _amount);
    }

    // Player 2 accepts the wager on a specific game
    function acceptWager(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(game.gameState == GameState.Open, "Wager not proposed");
        require(msg.sender != game.player1, "Player cannot accept own wager");

        game.player2 = msg.sender;
        game.gameState = GameState.Accepted;

        require(wagerToken.transferFrom(msg.sender, address(this), game.wagerAmount), "Transfer failed");

        emit WagerAccepted(_gameId, msg.sender);
    }

    // Either player can cancel the wager on a specific game
    function cancelWager(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(game.gameState == GameState.Open, "Wager not proposed or already accepted, finished or cancelled.");
        require(msg.sender == game.player1, "Only proposer can cancel");

        game.gameState = GameState.Cancelled;
        
        require(wagerToken.transfer(game.player1, game.wagerAmount), "Refund failed");

        emit WagerCancelled(_gameId, msg.sender);
    }

    // Function to be called by an external oracle or mutually trusted party to determine the winner
    function setWinner(uint256 _gameId, address _winner) external onlyOwner {
        Game storage game = games[_gameId];
        require(game.gameState == GameState.Accepted, "Wager not accepted yet");
        require(_winner == game.player1 || _winner == game.player2, "Invalid winner address");
        
        game.winner = _winner;
        game.gameState = GameState.Finished;

        emit WagerFinished(_gameId, _winner);
    }

    function abandon(uint256 _gameId) external onlyOwner {
        Game storage game = games[_gameId];
        require(game.gameState == GameState.Accepted, "Wager not accepted yet");

        game.gameState = GameState.Cancelled;
        
        require(wagerToken.transfer(_owner, game.wagerAmount * 1/25), "House cut transfer failed");
        require(wagerToken.transfer(game.winner, game.wagerAmount * 49/25), "Transfer to winner failed");

        emit WagerCancelled(_gameId, msg.sender);
    }

    //Winner claims the tokens
    function claim(uint256 _gameId) external {
        Game storage game = games[_gameId];
        require(game.gameState == GameState.Finished, "Wager not finished yet");
        require(msg.sender == game.winner, "Only winner can claim");

        require(wagerToken.transfer(_owner, game.wagerAmount * 1/25), "House cut transfer failed");
        require(wagerToken.transfer(game.winner, game.wagerAmount * 49/25), "Transfer to winner failed");

        emit WagerClaimed(_gameId, msg.sender);
    }
}
