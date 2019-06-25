import React, { Component } from 'react';
import { Table, Button, Container, Form, FormGroup, Input, InputGroup } from 'reactstrap';
import Inputs from './Inputs';
import Modal from 'react-modal';

class Tables extends Component {

    onSort(event, sortKey) {
        const data = this.props.items;
        data.sort((a, b) => a[sortKey].localeCompare(b[sortKey]))
        this.setState({ data })
    }

    render() {
        const { items, onDelete, onSubmit, onChangeTask, onChangeDate, onChangePriority, show, handleClose, handleShow, filterText } = this.props;

        return (
            <Table dark>
                <thead>
                    <tr>
                        <th> <Button>#</Button></th>
                        <th> <Button onClick={e => this.onSort(e, 'task')}>Name</Button></th>
                        <th> <Button onClick={e => this.onSort(e, 'date')}>Date</Button></th>
                        <th> <Button onClick={e => this.onSort(e, 'priority')}>Priority</Button></th>
                    </tr>
                </thead>
                <tbody>
                    {items.filter((item) => item.task.toLowerCase().indexOf(filterText.toLowerCase()) !== -1).map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item.id}
                            </td>
                            <td>
                                {item.task}
                            </td>
                            <td>
                                {item.date}
                            </td>
                            <td>
                                {item.priority}
                            </td>
                            <td className="text-right" >

                                <Button color="success" onClick={handleShow.bind(this, item.id)}>
                                    EDIT
                                </Button>
                                <Button color="danger" onClick={onDelete.bind(this, index)}>
                                    X
                                </Button>


                                <Modal isOpen={show} onHide={handleClose.bind(this)} >
                                    <Inputs onSubmit={onSubmit.bind(this)} onChangeTask={onChangeTask.bind(this)}
                                        onChangeDate={onChangeDate.bind(this)} onChangePriority={onChangePriority.bind(this)} handleShow={handleShow.bind(this)} />
                                    <Container>
                                        <Button color="secondary" size="lg" block onClick={handleClose.bind(this)}>close</Button>
                                    </Container>
                                </Modal>
                            </td>
                            <td>

                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table >
        );
    }
}
export default Tables;