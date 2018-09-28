import React  from 'react';
import {connector} from "../store/utils/connector";

const List = ({state, dispatch}) => {

  return (
    <div>
      list
    </div>
  )

}

export default connector(List)