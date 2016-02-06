// Wrap react-intl's components by passing messages and locales from the IntlStore
// Supports also the message props:
// Example
//
//    <FormattedMessage message="home.welcome" />

import { FormattedMessage, FormattedDate, FormattedNumber, FormattedRelative }
  from "react-intl";//Relies on Internationalization store to format messages, dates, and numbers in different languages and locations
import connectToIntlStore from "../utils/connectToIntlStore";

export default {//Not totally sure what is going on here?
  FormattedMessage: connectToIntlStore(FormattedMessage),//Returns a React component that will format messages
  FormattedDate: connectToIntlStore(FormattedDate),//Returns a React component that will format dates
  FormattedNumber: connectToIntlStore(FormattedNumber),//Returns a React component that will format numbers
  FormattedRelative: connectToIntlStore(FormattedRelative)//Returns a React component that will format relative dates
};
