import React from 'react';
import PropTypes from 'prop-types';

const CommandButton = ({ onExecute, icon, text, hint, color }) => (
  <button
    type="button"
    className="btn btn-link"
    style={{ padding: 11 }}
    onClick={e => {
      onExecute();
      e.stopPropagation();
    }}
    title={hint}
  >
    <span className={color}>
      {icon ? (
        <i className={`glyphicon glyphicon-${icon}`} style={{ marginRight: text ? 5 : 0 }} />
      ) : null}
      {text}
    </span>
  </button>
);

const propTypes = {
  onExecute: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string,
  hint: PropTypes.string.isRequired,
  color: PropTypes.string,
};

const defaultProps = {
  text: '',
  color: undefined,
};

CommandButton.displayName = 'CommandButton';
CommandButton.propTypes = propTypes;
CommandButton.defaultProps = defaultProps;

const commandComponentProps = {
  add: {
    icon: 'plus',
    hint: 'Create new row',
  },
  edit: {
    icon: 'pencil',
    hint: 'Edit row',
    color: 'text-warning',
  },
  delete: {
    icon: 'trash',
    hint: 'Delete row',
    color: 'text-danger',
  },
  commit: {
    icon: 'ok',
    hint: 'Save changes',
    color: 'text-success',
  },
  cancel: {
    icon: 'remove',
    hint: 'Cancel changes',
    color: 'text-danger',
  },
};

const CommandButtons = ({ id, onExecute }) => (
  <CommandButton {...commandComponentProps[id]} onExecute={onExecute} />
);

export default CommandButtons;
