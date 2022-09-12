export default async (req, res)=> {
  const { version } = req.query

  switch (version) {
    case "latest":
      return res.redirect("https://mirror.dc.uz/xinux/iso/alpha/xinux-en-2022.08.09-x86_64.iso");
    default:
      return res.redirect("https://mirror.dc.uz/xinux/iso/alpha/xinux-en-2022.08.09-x86_64.iso");
  }
};
