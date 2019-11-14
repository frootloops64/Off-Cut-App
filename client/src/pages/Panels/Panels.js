import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

// Should the dimensions be string? Or left as integer, but how?
class Panels extends Component {
    state = {
        panels: [],
        material: "polycarbonate",
        length: "",
        width: "",
        thickness: "",
        error: false,
    };

    componentDidMount() {
        this.loadPanels();
    }

    // Should the dimensions be string? Or left as integer, but how?
    loadPanels = () => {
        API.getPanels()
            .then(res =>
                this.setState({ 
                    panels: res.data, 
                    material: "polycarbonate",
                    length: "",
                    width: "",
                    thickness: "",
                    error: false,
                    })
                )
                .catch(err => console.log(err));
    };

    deletePanel = id => {
        API.deletePanel(id)
            .then(res => this.loadPanels())
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
        // ADD FIELD VALIDATION SET STATE OF ERROR TO TRUE
    };

    handleAddForm = event => {
        console.log('triggered handleFormSubmit', this.state.material && this.state.length && this.state.width && this.state.thicknes)
        event.preventDefault();
        if (this.state.material && this.state.length
            && this.state.width && this.state.thickness) {
                API.savePanel({
                    material: this.state.material,
                    length: parseInt(this.state.length),
                    width: parseInt(this.state.width),
                    thickness: parseInt(this.state.thickness)
                })
                    .then(res => this.loadPanels())
                    .catch(err => console.log(err));
            }
    };

     handleSearchForm = event => {
        console.log('triggered handleSearchForm')
        if (this.state.length
            || this.state.width || this.state.thickness) {
                // 'SEARCH PANEL'
                // API.savePanel({
                //     material: this.state.material,
                //     length: parseInt(this.state.length),
                //     width: parseInt(this.state.width),
                //     thickness: parseInt(this.state.thickness)
                // })
                    // .then(res => this.loadPanels())
                    // .catch(err => console.log(err));
            }
     }

     handleSelectChange = event => {
         this.setState({material: event.target.value});
     }

    render() {
        console.log('state', this.state)
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6 xs-12">
                        <Jumbotron>
                            <h1>Search Off-cuts</h1>
                        </Jumbotron>
                        <form>
                            <select onChange={this.handleSelectChange} value={this.state.material}>
                                <option value="polycarbonate">Polycarbonate</option>
                                <option value="nylon">Nylon</option>
                                <option value="uhmwpe">UHMWPE</option>
                            </select>
                            <Input
                                value={this.state.length}
                                onChange={this.handleInputChange}
                                name="length"
                                placeholder="Length in mm"
                            />
                            <Input
                                value={this.state.width}
                                onChange={this.handleInputChange}
                                name="width"
                                placeholder="Width in mm"
                            />
                            <Input
                                value={this.state.thickness}
                                onChange={this.handleInputChange}
                                name="thickness"
                                placeholder="Thickness in mm"
                            />
                            <FormBtn
                                disabled={!(this.state.length && this.state.width)}
                                onClick={this.handleSearchForm}
                                buttonType="btn-success"
                            >
                                Search Panels
                            </FormBtn>
                             <FormBtn
                                disabled={!(this.state.length && this.state.width)}
                                onClick={this.handleAddForm}
                                buttonType="btn-danger"
                            >
                                Add Panels
                            </FormBtn>
                            
                        </form>
                    </Col>
                    <Col size="md-6 xs-12">
                        <Jumbotron>
                            <h1>Off-cuts List</h1>
                        </Jumbotron>
                        {this.state.panels.length ? (
                            <List>
                                {this.state.panels.map(panel => {
                                return (
                                    <ListItem key={panel._id}>
                                        <a href={"/" + panel._id}>
                                            <strong>
                                            {panel.material}: {panel.length} x {panel.width} x {panel.thickness} mm
                                            </strong>
                                        </a>
                                        <DeleteBtn onClick={() => this.deletePanel(panel._id)} />
                                    </ListItem>
                                );
                                })}
                            </List>
                        ) : (
                        <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Panels;
