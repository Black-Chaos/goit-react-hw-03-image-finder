import { Modal } from "components/Modal/Modal";
import { Component } from "react";

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  togleModalOpen = () =>
    this.setState(st => ({ isModalOpen: !st.isModalOpen }));

  render() {
    const { link, bigImg, tags,  } = this.props;
    return (
      <li className="ImageGalleryItem" onClick={this.togleModalOpen}>
        <img className="ImageGalleryItem-image" src={link} alt={tags} />
        {this.state.isModalOpen && <Modal link={bigImg} tags={tags} handleCloseModal={ this.togleModalOpen} />}
      </li>
    );
  }
}