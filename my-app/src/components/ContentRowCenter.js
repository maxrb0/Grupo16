import { Component } from "react";
import LastMovieInDb from './LastMovieInDb';


class ContentRowCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        lastUser: [],
    };
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/users")
      .then((response) => response.json())
      .then((user) => {
        this.setState({
            lastUser: user.data,
        });
      })
      .catch((e) => console.log(e));
  }
  render() {
    return (
      <div>
    {this.state.lastUser.map((e) => {
        return (
            <LastMovieInDb 
            user_name={e.user_name}
            />
        );
      })}
    </div>
    );
  }
}

export default ContentRowCenter;