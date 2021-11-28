import { shallow } from "enzyme";
import Alert from "../../components/Alert";

describe("Alert Component", () => {
  let wrapper: any, handleOnClick: () => void;;
  beforeEach(() => {
    handleOnClick = jest.fn();
    wrapper = shallow(<Alert
      handleOnClick={handleOnClick}
      title="Network Error!"
      description="A network error occurred. Please try reconnecting again"
      status="error"
      closeButton={true}
    />);
  });

  it("should render Alert Error component correctly", () => {
      expect(wrapper).toMatchSnapshot();
  });

  test("should call handleOnClick on button click", () => {
    wrapper.find("CloseButton").simulate("click");
    expect(handleOnClick).toHaveBeenCalled();
});
});