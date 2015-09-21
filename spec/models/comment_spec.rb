require 'rails_helper'

RSpec.describe Comment, type: :model do
  describe 'validations' do
    describe 'has text' do
      let(:comment) { Comment.new }

      it 'is invalid if text is blank' do
        expect(comment.valid?).to eq(false)
      end  

      it 'is valid with text' do
        comment.txt = "Lorem ipsum"
        expect(comment.valid?).to eq(true)
      end
    end
  end
end
