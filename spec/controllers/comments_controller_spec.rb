require 'rails_helper'

RSpec.describe CommentsController, type: :controller do

  # This should return the minimal set of attributes required to create a valid
  # Comment. As you add validations to Comment, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    {
      author: Faker::Name.name,
      txt: Faker::Lorem.paragraph
    }
  }

  let(:invalid_attributes) {
    {
      livefor: "thafunk"
    }
  }

  before do
    Comment.create! valid_attributes
    Comment.create! valid_attributes

    @comments = Comment.all
  end

  describe "GET #index" do
    it "returns http success" do
      get :index, {format: :json}
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    it "returns http success" do
      get :show, {format: :json, id: @comments.first.id}
      expect(response).to have_http_status(:success)
    end
  end

=begin
  describe "GET #new" do
    it "returns http success" do
      get :new, {format: :json}
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #edit" do
    it "returns http success" do
      get :edit, {format: :json, id: @comments.first.id}
      expect(response).to have_http_status(:success)
    end
  end
=end

  describe "POST #create" do
    it "returns http success" do
      post :create, {format: :json, comment: valid_attributes}
      expect(response).to have_http_status(:success)
    end
  end

  describe "PATCH #update" do
    it "returns http success" do
      patch :update, {format: :json, id: @comments.first.id, comment: valid_attributes}
      expect(response).to have_http_status(:success)
    end
  end

  describe "DELETE #destroy" do
    it "returns http success" do
      delete :destroy, {format: :json, id: @comments.first.id}
      expect(response).to have_http_status(:no_content)
    end
  end

end
