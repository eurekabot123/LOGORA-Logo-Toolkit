import axios from "axios";

export async function POST(req: Request) {
  const { image_work_id } = await req.json();
  const res = await axios.get(
    // `${"http://127.0.0.1:8080/api/logo"}/work/${image_work_id}`
    `${"http://18.144.25.101/api/logo"}/work/${image_work_id}`
  );
  console.log(res.data, res);
  return Response.json(res.data);
}
