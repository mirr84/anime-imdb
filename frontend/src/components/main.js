import React from 'react';
import {connector} from "../store/utils/connector";

import { Card, CardText, CardBody, CardTitle } from 'reactstrap';

const Main = ({state, dispatch}) => {

  return (
    <div>
      
      <Card>
        <CardBody>
          <CardTitle>Стартовая форма</CardTitle>
          <CardText> 
          	текст текст текст текст текст текст текст текст текст текст текст текст 
          	текст текст текст текст текст текст текст текст текст текст текст текст
          	текст текст текст текст текст текст текст текст текст текст текст текст 
          	текст текст текст текст текст текст текст текст текст текст текст текст
          	текст текст текст текст текст текст текст текст текст текст текст текст 
          	текст текст текст текст текст текст текст текст текст текст текст текст          	
          </CardText>
        </CardBody>
      </Card>

    </div>
  )

}

export default connector(Main)