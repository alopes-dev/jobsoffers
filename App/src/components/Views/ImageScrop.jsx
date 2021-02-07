import React from "react";
import Avatar from "react-avatar-edit";
// import Image from "../../imgs/uploadPlaceHolder.jpg";
import { Row, Container, Col } from "reactstrap";
class PreviewImage extends React.Component {
  constructor(props) {
    super(props);
    const src = null;
    this.state = {
      preview: null,
      src
    };
    this.onCrop = this.onCrop.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onClose() {
    this.setState({ preview: null });
  }

  onCrop(preview) {
    this.setState({ preview });
  }

  render() {
    return (
      <>
        <Container>
          <Row>
            <Col xl="8">
              <Avatar
                width={290}
                height={220}
                onCrop={this.onCrop}
                onClose={this.onClose}
                src={this.state.src}
              />
            </Col>
            <Col xl="4">
              {this.state.preview !== null ? (
                <img src={this.state.preview} alt="Preview" />
              ) : (
                <></>
              )}
              {this.props.renderImage(this.state.preview)}
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default PreviewImage;
