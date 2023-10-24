import xml2js from 'xml2js';
type xml = {
    urlrewrite: {
        rule: [
            {
                from: string [],
                to: [{
                        "_": string,
                    },
                    {
                        "$": {
                                "type": string,
                        }
                    }
                ],
                set: [{
                        "_": number,
                    },
                    { 
                        "$": {
                            "type": string,
                        }
                    }
                ]
            }
        ]
    }
}
// TODO Add rewrite rule type
export default async function xmlParser(xmlString: string): Promise<xml> {
    return new Promise((res, rej) => {
        const parser = new xml2js.Parser();
        // Parse the XML string
        parser.parseString(xmlString, (err, result) => {
            if (err) {
                rej('Error parsing XML:' + err);
            } else {                
            // Access the parsed XML data
                res(result);
            }
        });
    });
}