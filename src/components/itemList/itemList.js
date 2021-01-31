import React, {useState, useEffect} from 'react';

import {Card, ListGroup, ListGroupItem, Spinner} from 'reactstrap';

function ItemList ({getData, onItemSelected, renderItem}) {

    const [itemList, updateList] = useState([]);

    useEffect(()=>{
        getData()
            .then((data)=>{
                updateList(data)
            })

        }
    , [])

    function renderItems(arr){
        return arr.map((item)=>{
            const {id} = item;
            const label = renderItem(item);
            return (
                <ListGroupItem
                    key = {id}
                    style={{cursor: 'pointer'}}
                    onClick={() =>{onItemSelected(item.id)}}
                >
                    {label}
                </ListGroupItem >
            )
        })
    }

    if(!itemList) {
        return  <Spinner> </Spinner>
    }

    const items =
        renderItems(itemList);

    return (
        <Card body className="p-3 rounded">
            <ListGroup>
                {items}
            </ListGroup>
        </Card>
    );
}

export default ItemList;
