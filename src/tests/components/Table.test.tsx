import { shallow } from "enzyme";
import Table from "../../components/Table";

describe("Table Component", () => {
  let wrapper: any;
  beforeEach(() => {
      wrapper = shallow(<Table
        tableHeader={['Store', 'Shoe model', 'Quantity left']}
        data={[]}
        label="Latest Sales Completed"
      />);
  });

  it("should render Table component correctly", () => {
      expect(wrapper).toMatchSnapshot();
  });

  it("should contain Heading element with text", () => {
    expect(wrapper.find("Heading").text()).toEqual("Latest Sales Completed");
});
});