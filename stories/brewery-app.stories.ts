import { html, TemplateResult } from 'lit';
import '../src/brewery-app.js';

export default {
  title: 'BreweryApp',
  component: 'brewery-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  city: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({
  city,
  backgroundColor = 'white',
}: ArgTypes) => html`
  <brewery-app
    style="--brewery-app-background-color: ${backgroundColor}"
    city=${city}
  ></brewery-app>
`;

export const App = Template.bind({});
App.args = {
  city: 'Law Vegas',
  backgroundColor: '#e7b3a1',
};
