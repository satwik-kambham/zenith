export default async function handle(req, res) {
  console.log(req.body);
  const result =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.";
  res.status(200).json({ result: result });
}
