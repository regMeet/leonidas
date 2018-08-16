import { connect } from 'react-redux';
import { selectors as AuthSelectors, saveUser, logout } from 'modules/Auth';
import NavigationHeader from '../components';

const mapStateToProps = state => ({
  name: AuthSelectors.getUserName(state),
});

const mapDispatchToProps = {
  saveUser,
  logout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NavigationHeader);
