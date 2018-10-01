import React  from 'react';
import {connector} from "../store/utils/connector";

import {Input, Table} from 'reactstrap';
import lifecycle from "react-pure-lifecycle";
import {getAllListAnime} from "../services/serviceAnime";

const methods = {
    componentDidMount(props) {
        getAllListAnime(props);
    }
}

const List = ({state, dispatch}) => {

  return (
    <div>

        <Table size="sm" striped hover>
            <thead>
            <tr>
                <th>#</th>
                <th>
                    Название <br/>
                    <Input bsSize="sm" type="text" name="name" id="name" placeholder="Название"
                           value={state.animeReducer.filter.name}
                           onChange={
                               (e) => {
                                   dispatch.changeFilterName(e.target.value);
                                   getAllListAnime({state, dispatch});
                               }
                           }
                    />
                </th>
                <th>Жанр</th>
            </tr>
            </thead>
            <tbody>
            {
                state.animeReducer.allList
                    .map(
                        (item, idx) =>
                            <tr key={idx}>
                                <th scope="row">{ item.id }</th>
                                <td>{ item.name }</td>
                                <td>{ item.genre }</td>
                            </tr>
                    )
            }
            </tbody>
        </Table>
    </div>
  )

}

export default connector(lifecycle(methods)(List));