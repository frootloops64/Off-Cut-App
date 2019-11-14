import React, { Component } from "react";
import Jumbotron from "../../components/";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

// Should the dimensions be string? Or left as integer, but how?
class Panels extends Component {
    state = {
        panels: [],
        material: "",
        length: "",
        width: "",
        thickness: ""
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
                    material: "",
                    length: "",
                    width: "",
                    thickness: ""
                    })
                )
                .cath(err => console.log(err));
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
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.material && this.state.length
            && this.state.width && this.state.thickness) {
                API.savePanel({
                    material: this.state.material,
                    length: this.state.length,
                    width: this.state.width,
                    thickness: this.state.thickness
                })
                    .then(res => this.loadPanels())
                    .catch(err => console.log(err));
            }
    };

    render() {
        return (
            
        )
    }

}
