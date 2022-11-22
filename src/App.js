import { Table } from 'antd';
import { useEffect, useState } from 'react';

function App() {

  const [data , setData] = useState([])

  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => {
      json.map(i => {
        i.key = i.id
      })
      setData(json)
    })
  },[])

  const deleteRecord  = (record) => {
    console.log(record)
    setData(prev => prev.filter(i => i!==record))
  }

  const columns = [
    {
      title:'Id',
      dataIndex:'id',
      key:'Id'
    },
    {
      title: 'Name',
      dataIndex:'name',
      key:'Name'
    },
    {
      title:'Email',
      dataIndex:'email',
      key:'Email'
    },
    {
      title:'Website',
      dataIndex:'website',
      key:'Website'
    },
    {
      title:'Action',
      render: (record)=>  <button onClick={() => deleteRecord(record)} style={{color:'blue',border:'none',background:'transparent',textDecoration:'underline',cursor:'pointer'}}>Delete</button>
    }
  ]

  return (
    <Table
      dataSource={data}
      columns={columns}
      expandable={{
        expandedRowRender : () => {
          return <Table
            dataSource={data}
            columns={columns}
          >

          </Table>
        }
      }}
    >

    </Table>
  );
}

export default App;
