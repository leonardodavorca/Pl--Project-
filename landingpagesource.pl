page = "<html><head><meta charset='utf-8'><style>body{font-family:Segoe UI,sans-serif;margin:0;text-align:center}.hero{padding:70px 20px;background:linear-gradient(90deg,#8b5cf6,#ec4899);color:#fff}h1{font-size:2.6rem;margin:0}a.btn{display:inline-block;margin-top:20px;padding:12px 26px;border-radius:10px;background:#fff;color:#8b5cf6;text-decoration:none;font-weight:600}</style></head><body><section class='hero'><h1>Build with pl-</h1><p>Simple code for simple websites.</p><a class='btn' href='#'>Start now</a></section></body></html>"

fn home
    give page
end

web.start("/", home)
