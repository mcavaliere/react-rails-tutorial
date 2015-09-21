require 'rails_helper'

RSpec.describe Todo, type: :model do
  describe 'validations' do
    describe 'has a title' do
      let(:todo) { Todo.new }

      it 'is invalid if title is blank' do
        expect(todo.valid?).to eq(false)
      end  

      it 'is valid with a title' do
        todo.txt = "Lorem ipsum"
        expect(todo.valid?).to eq(true)
      end
    end
  end
end
