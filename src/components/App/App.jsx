import { Component } from 'react';
import { PixabayAPI } from 'API/PixabayAPI';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { MagnifyingGlass } from 'react-loader-spinner';

const pixApi = new PixabayAPI();
pixApi.setParams({
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: 12,
});

export class App extends Component {
  state = {
    imgs: [],
    loading: false,
  };
  search = q => {
    pixApi.setParams({ q });
    this.setState({
      imgs: [],
    });
    this.getImages();
  };

  getImages = async () => {
    this.setState({
      loading: true,
    });
    try {
      const data = await pixApi.search();
      if (data) {
        this.setState(prevState => ({
          imgs: [...prevState.imgs, ...data.hits],
        }));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { imgs, loading } = this.state;

    return (
      <div className="App">
        <Searchbar onSubmit={this.search} />
        <ImageGallery>
          {imgs.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              link={webformatURL}
              bigImg={largeImageURL}
              tags={tags}
            />
          ))}
        </ImageGallery>
        {imgs.length ? <Button handleClack={this.getImages} /> : false}
        {loading && (
          <div className="Overlay">
            <MagnifyingGlass
              visible={true}
              height="240"
              width="240"
              ariaLabel="MagnifyingGlass-loading"
              wrapperStyle={{}}
              wrapperClass="MagnifyingGlass-wrapper"
              glassColor="#c0efff"
              color="#3f51b5"
            />
          </div>
        )}
      </div>
    );
  }
}
