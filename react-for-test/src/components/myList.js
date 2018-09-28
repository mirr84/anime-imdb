import React from 'react';
import {connector} from "../store/utils/connector";

const MyList = ({state, dispatch}) => {

  return (
    <div>
      myList
    </div>
  )

}

export default connector(MyList);