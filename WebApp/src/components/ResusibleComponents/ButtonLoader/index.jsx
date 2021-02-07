import React from 'react';
import PropTypes from 'prop-types';
import Loading from 'react-loading';

export default function ButtonLoading({
  iconType,
  iconWidth,
  iconHeight,
  spaceBetweenIconAndText,
  isLoading,
  overText,
  text,
  ...rest
}) {
  // Verifying if the overText was defined
  if (isLoading && overText) text = overText;

  return (
    <button {...rest} disabled={isLoading}>
      <div className="d-flex">
        {isLoading && (
          <Loading
            type={iconType}
            width={iconWidth}
            height={iconHeight}
            className={spaceBetweenIconAndText}
          />
        )}
        <span>{text}</span>
      </div>
    </button>
  );
}

/**
 * Default props
 */
ButtonLoading.defaultProps = {
  text: 'Lorem ipsum',
  isLoading: false,
  iconWidth: 18,
  iconHeight: 18,
  spaceBetweenIconAndText: 'mr-2',
  iconType: 'spin',
};

/**
 * Prop Types
 */
ButtonLoading.propTypes = {
  text: PropTypes.string, // The text to show in button.
  isLoading: PropTypes.bool, // If true, show the icon load.
  iconWidth: PropTypes.number, // The width of the icon load.
  iconHeight: PropTypes.number, // The width of the icon load.
  spaceBetweenIconAndText: PropTypes.string, // The space between icon and text.
  iconType: PropTypes.string, // Type the icon that will be shown.
  overText: PropTypes.string, // If defined, replace the text of the button
};
