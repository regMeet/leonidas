import { connect } from 'react-redux';
import { selectors, fetchUsers } from 'modules/Users';
import UsersTable from 'modules/Users/components/UsersTable';

const mapStateToProps = state => ({
  users: selectors.getUsers(state),
  isLoading: selectors.isLoading(state),
  errorMessage: selectors.getErrorMessage(state),
});

const mapDispatchToProps = {
  fetchUsers,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersTable);
