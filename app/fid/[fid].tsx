import { useParams } from 'next/navigation';

export default function FIDPage() {
  const params = useParams();
  const fid = params.fid;

  return (
    <div>
      <h1>FID: {fid}</h1>
      {/* ... display content related to this FID */}
    </div>
  );
}
