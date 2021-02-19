

import * as React from "react";
import moment from "moment";
import { debounce } from "lodash";

const UPDATE_DEBOUNCE_INTERVAL = 700;

type Props = {
  children: React.ReactNode;
  dateOnly: boolean;
  fieldName?: string;
  timeOnly: boolean;
  updateDatetime: (datetime: string | null) => void;
  uuid?: UUID;
  value?: moment$Moment;
};

type State = {
  datetime: moment$Moment | null | undefined;
};

class DatetimePicker extends React.Component<Props, State> {

  state = {
    datetime: this.props.value
  };

  static defaultProps = {
    dateOnly: false,
    timeOnly: false
  };

  // This is necessary because for datetime fields, 2 datepickers are present, so when
  // text is input into the time field, the date field's datepicker also observes a change
  // and fires its onChange event. This boolean flag is used to prevent that extra onChange
  // event from firing.
  textInput: boolean | null | undefined;

  handleChange = (datetime: moment$Moment): void => {
    const {
      dateOnly,
      timeOnly,
      updateDatetime
    } = this.props;

    if (this.textInput) {
      this.textInput = false;
      return;
    }

    this.setState({ datetime }, () => {
      if (updateDatetime) {
        if (this.state.datetime) {
          let formattedDatetime;

          if (dateOnly) {
            formattedDatetime = this.state.datetime.format('YYYY-MM-DD');
          } else if (timeOnly) {
            formattedDatetime = datetime ? this.state.datetime.format('HH:mm') : null;
          } else {
            formattedDatetime = this.state.datetime.toISOString(true);
          }

          updateDatetime(formattedDatetime);
        } else {
          updateDatetime(null);
        }
      }
    });
  };

  handleChangeDebounced = debounce(this.handleChange, UPDATE_DEBOUNCE_INTERVAL);

  // Handles update of time picker via text input
  handleChangeRaw = (datetimeRaw: string): void => {
    const datetime = this.state.datetime || moment();
    const newDatetime = moment.utc(datetimeRaw, 'h:mm A', true);

    if (!this.props.timeOnly) {
      this.textInput = true;
    }

    if (newDatetime.isValid()) {
      newDatetime.year(datetime.year()).month(datetime.month()).date(datetime.date());
      this.handleChangeDebounced(newDatetime);
    }
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        value: this.state.datetime,
        onChange: this.handleChange,
        onChangeRaw: this.handleChangeRaw
      });
    });

    return <div className="datetime-picker ds-form-group">
        {children}
      </div>;
  }
}

export default DatetimePicker;