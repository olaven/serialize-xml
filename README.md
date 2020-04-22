# serialize-xml ![Test](https://github.com/olaven/serialize-xml/workflows/Test/badge.svg)
A simple [deno](deno.land) module for serializing objects to XML. 

## Usage 
There is _one_ concept here:
* `Tag` - representing a tag, like `<this></this>`

## Examples
```ts
import  { serialize } from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.3.1/mod.ts"

const xml = serialize({
    name: "my_tag_name", 
    children: [
        {
            name: "sub_tag", 
            children: "inner_content_of_tag", 
            attributes: [
                ["attribute_key", "attribute_value"]
            ]
        }
    ],
    attributes: []
});

//prints: '<my_tag_name><sub_tag attribute_key="attribute_value">inner_content_of_tag</sub_tag></my_tag_name>'
console.log("serialized: ", xml); 
```

__EXPERIMENTAL__: 
Alternatively, you can build tags using the `tag`-function. The advantage of that is that 
`children` and `attributes` can be omitted if it is not needed. 
```ts
import  { serialize, tag } from "https://raw.githubusercontent.com/olaven/serialize-xml/v0.3.1/mod.ts"

//<name></name>
const without_children = serialize(tag("name"))
//<name>children</name>
const without_attributes = serialize(tag("name", "children"))
//<name key="value">children</name>
const full_tag = serialize(tag("name", "children", [["key", "value"]]))

const xml = serialize(
    tag("outer", 
        [
            tag("inner", "content")
        ], 
        [
            ["key", "value"]
        ]
    )
); 

//prints: <outer><inner key="value">content</inner></outer>
console.log("serialized: ", xml);
```
