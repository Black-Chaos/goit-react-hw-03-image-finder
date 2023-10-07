import { PixabayAPI } from 'API/PixabayAPI';
import { Button } from 'components/Button/Button';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { Component } from 'react';
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
    page: 1
  };

  componentDidUpdate(_, s) {
    if (s.page !== this.state.page && this.state.page !== 1) return this.getImages()
  }
  
  search = q => {
    pixApi.setSearchQuestion(q);
    this.setState({
      imgs: [],
      page: 1,
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
    const result = Boolean(imgs.length);

    return (
      <div className="App">
        <Searchbar onSubmit={this.search} />
        {result ? <ImageGallery images={ imgs} /> : <p className='message'>No result</p>}
        {result && <Button handleClack={() => this.setState((s) => ({page: s.page +1}))} />}
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
