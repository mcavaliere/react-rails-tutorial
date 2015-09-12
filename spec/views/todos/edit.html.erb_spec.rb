require 'rails_helper'

RSpec.describe "todos/edit", type: :view do
  before(:each) do
    @todo = assign(:todo, Todo.create!(
      :text => "MyString",
      :done => false
    ))
  end

  it "renders the edit todo form" do
    render

    assert_select "form[action=?][method=?]", todo_path(@todo), "post" do

      assert_select "input#todo_text[name=?]", "todo[text]"

      assert_select "input#todo_done[name=?]", "todo[done]"
    end
  end
end
