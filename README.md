# serialize-xml 
A simple [deno](deno.land) module for serializing objects to XML. 

## Usage 
There are two types that are relevant: 
1. `Tag` - representing a tag, like `<this></this>`
2. `Attribute` - `<tag represents="key value pairs like this"></tag>`

## Example 
```ts
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
