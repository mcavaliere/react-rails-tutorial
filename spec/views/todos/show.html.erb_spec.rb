require 'rails_helper'

RSpec.describe "todos/show", type: :view do
  before(:each) do
    @todo = assign(:todo, Todo.create!(
      :text => "Text",
      :done => false
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/Text/)
    expect(rendered).to match(/false/)
  end
end
