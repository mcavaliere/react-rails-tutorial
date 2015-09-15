json.array!(@comments) do |comment|
  json.extract! comment, :id, :author, :txt
  json.url comment_url(comment, format: :json)
end
