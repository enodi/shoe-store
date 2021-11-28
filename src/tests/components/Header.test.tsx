import { shallow } from "enzyme";
import Header from "../../components/Header";

describe("Header Component", () => {
  let wrapper: any;
  beforeEach(() => {
      wrapper = shallow(<Header />);
  });

  it("should render Header component correctly", () => {
      expect(wrapper).toMatchSnapshot();
  });

  it("should contain Heading element with text", () => {
      expect(wrapper.find("Heading").text()).toEqual("Aldo Store");
  });
});