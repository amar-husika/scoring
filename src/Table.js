import React from "react";

  const Row =props=>{
    const {position, name, score}=props
    return(
      <tr>
        <td>{position}</td>
        <td>{name}</td>
        <td>{score}</td>
      </tr>
    )
  }
const Table=props=>{
    const {data}=props
    return(
      <table>
        <thead className="tbl-header">
  <tr>
        <td>POSITION</td>
        <td>NAME</td>
        <td>SCORE</td>
      </tr>
      </thead>
     
        <tbody className="tbl-content">
          {data.map(row=>
            <Row 
            position={row.position}
            name={row.name}
            score={row.score}
            />)}
        </tbody>
      </table>
    )
  }

export default Table