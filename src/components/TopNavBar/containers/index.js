import { connect } from 'react-redux';
import { selectors as AuthSelectors, logout } from 'modules/Auth';
import NavigationHeader from '../components';

const mapStateToProps = state => ({
  user: AuthSelectors.getUser(state),
});

const mapDispatchToProps = {
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationHeader);
