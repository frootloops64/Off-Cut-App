import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import { verify } from "crypto";


class Panels extends Component {
    state = {
        panels: [],
        material: "polycarbonate",
        length: "0",
        width: "0",
        thickness: "0",
        error: false,
    };

    componentDidMount() {
        console.log('comp did mount')
        this.loadPanels();
    }

    loadPanels = () => {
        console.log('load panels')
        API.getPanels()
            .then(res =>
                this.setState({ 
                    panels: res.data, 
                    material: "polycarbonate",
                    length: "0",
                    width: "0",
                    thickness: "0",
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
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        this.setState({
            [name]: value
        });
    };
    //     switch (name) {
    //         case 'length': 
    //             errors.length = Number.isInteger(value) && value.length > 0 ? "Length is invalid" : ''
    //             // Put condition to check if value for length field is acceptable
    //             break;
    //         case 'width': 
    //             // Put condition to check if value for length field is acceptable
    //             break;
    //         case 'thickness': 
    //             // Put condition to check if value for length field is acceptable
    //             break;
    //         default:
    //             break;
    //     }

    //     this.setState({errors, [name]: value}, ()=> {
    //         console.log(errors)
    //     })

    // };
        // ADD FIELD VALIDATION SET STATE OF ERROR TO TRUE

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

    search = (e) => {
        e.preventDefault();
        console.log('searching.....', this.state)
     const filteredPanels = this.state.panels.filter( (panel) => {
         console.log('PANEL', panel)
        return panel.width >= this.state.width && panel.length >= this.state.length && panel.thickness >= this.state.thickness
        && panel.material === this.state.material
      })  

      this.setState({
          panels: filteredPanels
      })
    } 

    // handleSearchForm = event => {
    //     console.log('triggered handleSearchForm')
    //     event.preventDefault();
    //     if (this.state.material || this.state.length 
    //     || this.state.width || this.state.thickness) {
    //             API.getPanelsByData({
    //                 material: this.state.material,
    //                 length: parseInt(this.state.length),
    //                 width: parseInt(this.state.width),
    //                 thicknes: parseInt(this.state.thickness)
    //             })
    //                 .then(res =>
    //                 this.setState({ 
    //                     panels: res.data, 
    //                     material: "polycarbonate",
    //                     length: "0",
    //                     width: "0",
    //                     thickness: "0",
    //                     error: false,
    //                 })
    //             )
    //             .catch(err => console.log(err));
    //         }
    // };

    handleSelectChange = event => {
         this.setState({material: event.target.value});
    };

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col size="md-6 xs-12">
                        <Jumbotron>
                            <h1>Add or Search Off-cuts</h1>
                        </Jumbotron>
                        <form >
                            <select name='material' onChange={this.handleSelectChange} value={this.state.material}>
                                <option value="polycarbonate">Polycarbonate</option>
                                <option value="Nylon">Nylon</option>
                                <option value="UHMWPE">UHMWPE</option>
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
                                onClick={this.search}
                                buttonType="btn-success"
                            >
                                Search Panels
                            </FormBtn>
                             <FormBtn
                                disabled={!(this.state.length && this.state.width)}
                                buttonType="btn-danger"
                                onClick={this.handleAddForm}
                            >
                                Add Panels
                            </FormBtn>
                            <button onClick={this.loadPanels}> reset</button>
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
