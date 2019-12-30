import React, { useState } from 'react';
import { Button, Spinner, Datatable, Header } from './components';

const style = {
  margin: 10,
};

const data = JSON.parse(
  '[{"firstName":"corn","lastName":"wool","age":16,"visits":18,"progress":81,"status":"relationship"},{"firstName":"care","lastName":"play","age":9,"visits":52,"progress":80,"status":"complicated"},{"firstName":"country","lastName":"cub","age":25,"visits":79,"progress":1,"status":"relationship"},{"firstName":"highway","lastName":"help","age":25,"visits":43,"progress":8,"status":"single"},{"firstName":"straw","lastName":"apparatus","age":8,"visits":3,"progress":97,"status":"relationship"},{"firstName":"waves","lastName":"cakes","age":7,"visits":95,"progress":33,"status":"single"},{"firstName":"umbrella","lastName":"vacation","age":8,"visits":96,"progress":43,"status":"relationship"},{"firstName":"maintenance","lastName":"development","age":8,"visits":70,"progress":19,"status":"complicated"},{"firstName":"spy","lastName":"home","age":5,"visits":75,"progress":0,"status":"complicated"},{"firstName":"fish","lastName":"software","age":0,"visits":74,"progress":5,"status":"complicated"},{"firstName":"hydrant","lastName":"cakes","age":24,"visits":1,"progress":93,"status":"relationship"},{"firstName":"start","lastName":"degree","age":24,"visits":82,"progress":39,"status":"complicated"},{"firstName":"street","lastName":"goose","age":12,"visits":61,"progress":41,"status":"single"},{"firstName":"balls","lastName":"presentation","age":26,"visits":40,"progress":25,"status":"complicated"},{"firstName":"desk","lastName":"lizards","age":24,"visits":47,"progress":87,"status":"relationship"},{"firstName":"response","lastName":"emphasis","age":24,"visits":76,"progress":74,"status":"relationship"},{"firstName":"pancake","lastName":"garbage","age":11,"visits":97,"progress":72,"status":"complicated"},{"firstName":"banana","lastName":"signature","age":11,"visits":93,"progress":96,"status":"complicated"},{"firstName":"currency","lastName":"street","age":7,"visits":80,"progress":26,"status":"relationship"},{"firstName":"aspect","lastName":"body","age":27,"visits":55,"progress":3,"status":"single"}]'
);

function App() {
  const [tableState, setTableState] = useState({});

  const columns = React.useMemo(
    () => [
      {
        ...Datatable.getSelectionColumn(),
        onChange: (...args) => console.log(args),
        onChangeAll: (...args) => console.log(args[2]([0])),
      },
      {
        Header: 'First',
        accessor: 'firstName',
        minWidth: 250,
      },
      {
        Header: 'Last',
        accessor: 'lastName',
      },
      {
        Header: 'Age',
        accessor: 'age',
        width: 50,
      },
      {
        Header: 'Status',
        accessor: 'status',
        meta: {
          fixed: 'right',
        },
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        meta: {
          fixed: 'right',
        },
      },
      {
        Header: 'Profile Progress',
        accessor: 'progress',
        meta: {
          isReorderable: false,
        },
      },
    ],
    []
  );

  return (
    <div className="App">
      <Header />

      <Button style={style}>Mallone</Button>

      <Button style={style} icon={'fa-pen'}>
        Mallone
      </Button>

      <Button style={style} icon={'fa-trash'}>
        Mallone
      </Button>

      <Button style={style} icon={'fa-trash'}></Button>

      <Button style={style} icon={'fa-trash'} small risky></Button>

      <Button style={style} small>
        Small
      </Button>

      <Button style={style} disabled>
        Disabled
      </Button>

      <Button style={style} primary>
        Primary
      </Button>

      <Button style={style} risky>
        Risky
      </Button>

      <Button style={style} icon="fa-user" sneaky transparent />

      <Button style={style} transparent>
        Transparent
      </Button>

      <Button style={style} icon="fa-user" loading>
        Loading
      </Button>
      <Button style={style} loading></Button>
      <Button style={style} loading primary></Button>
      <Button style={style} loading small></Button>

      <div style={{ width: '55%' }}>
        <Button block>Block</Button>
      </div>

      <div>
        <Spinner />
        <Spinner large />
      </div>

      <div style={{ marginLeft: 50, transform: 'translatey(25px)' }}>
        <label>
          <input
            type="checkbox"
            checked={Boolean(tableState.isReorderable)}
            onChange={() =>
              setTableState({
                ...tableState,
                isReorderable: !tableState.isReorderable,
              })
            }
          />{' '}
          isReorderable
        </label>{' '}
        <label>
          <input
            type="checkbox"
            checked={Boolean(tableState.isResizable)}
            onChange={() =>
              setTableState({
                ...tableState,
                isResizable: !tableState.isResizable,
              })
            }
          />{' '}
          isResizable
        </label>
      </div>

      <div style={{ display: 'flex' }}>
        <Datatable
          {...tableState}
          columns={columns}
          data={data}
          rowActions={<></>}
        />
      </div>

      <pre>
        <code>{JSON.stringify(columns, null, 2)}</code>
      </pre>
    </div>
  );
}

export default App;
