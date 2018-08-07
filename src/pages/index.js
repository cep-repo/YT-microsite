import React from "react";

const IndexComp = props =>
    <div>
      <p>{props.fields.slug}</p>
    </div>

export default ({ data }) => {
    return (
        <div>
            <h1>Welcome to the YT Microsite Home!!</h1>
            <table>
                <tbody>
                {data.allDataJson.edges.map(( { node }, index) => 
                    <tr key={index}>
                        <td>
                            <a href={node.fields.slug}>{node.fields.slug}</a>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export const query = graphql`
  query IndexQuery {
    allDataJson {
        edges {
            node {
                fields {
                    slug
                    }
                }
            }
        }
    }
`