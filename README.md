# serialize-xml ![Test](https://github.com/olaven/serialize-xml/workflows/Test/badge.svg)
A simple [deno](deno.land) module for serializing objects to XML. 

## Usage 
There is _one_ concept here:
* `Tag` - representing a tag, like `<this></this>`

## Example 
```ts
import  { serialize } from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.2.0/mod.ts"

const xml = serialize({
    name: "my_tag_name", 
    children: [
        {
            name: "sub_tag", 
            children: "inner_content_of_tag", 
            attributes: []
        }
    ],
    attributes: []
});

//prints: `<my_tag_name><sub_tag>inner_content_of_tag</sub_tag></my_tag_name>`
console.log("serialized: ", xml); 
```
