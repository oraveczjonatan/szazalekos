import fs from "fs";
import http from "http";
import url from "url";

export default class Content {
    public static content(req: http.IncomingMessage, res: http.ServerResponse): void {
        if (req.url === "/favicon.ico") {
            res.writeHead(200, { "Content-Type": "image/x-icon" });
            fs.createReadStream("favicon.ico").pipe(res);
            return;
        }
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.write("<!DOCTYPE html>");
        res.write("<html lang='hu'>");
        res.write("<head>");
        res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
        res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
        res.write("<title>Százalékos</title>");
        res.write("</head>");
        res.write("<body><form><pre>");

        const params = new url.URL(req.url as string, `http://${req.headers.host}/`).searchParams;

        //res.write("Egyszerű Százalékszámítás\n");
        //res.write("<span style='color: blue;'><i>+-5%'</i></span>\n");
        let szamod = parseInt(params.get("szam") as string);
        let szamod2 = parseInt(params.get("szam2") as string);

        if (isNaN(szamod)) szamod = 0;
        res.write(`+5%-a ${(szamod / 100) * 105} \n`);
        res.write(`Kérem a Számot: <input type='number' name='szam' value=${szamod} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(`-5%-a ${(szamod / 100) * 95} \n`);

        res.write("<br> <br>");
        if (isNaN(szamod2)) szamod2 = 0;
        res.write(`+5%-a ${(szamod2 / 100) * 105} \n`);
        res.write(`Kérem a Számot: <input type='number' name='szam2' value=${szamod2} style='max-width:100px;' onChange='this.form.submit();'>\n`);
        res.write(`-5%-a ${(szamod2 / 100) * 95} \n`);

        res.write("</pre></form>");
        res.write("</body></html>");
        res.end();
    }
}
