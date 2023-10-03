import { Component } from "react";

export class Modal extends Component {
    componentDidMount() {
        document.addEventListener('keydown', this.handleClose)
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleClose);
    }

    handleClose = ({ code }) => {
        if (code === 'Escape') {
            this.props.handleCloseModal()
        }
    }
    
    render() {
        const { link, tags } = this.props;
        return (
      <div className="Overlay">
        <div className="Modal">
          <img src={link} alt={tags} />
        </div>
      </div>
    );}
}