export const Travel = (props) => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            {props.labels.map(label => <th>{label}</th>)}
          </tr>
        </thead>
        <tbody>
          {props.values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map(v => <td>{v}</td>)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}