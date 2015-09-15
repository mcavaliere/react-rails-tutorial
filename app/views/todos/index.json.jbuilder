json.array!(@todos) do |todo|
  json.extract! todo, :id, :txt, :done
  json.url todo_url(todo, format: :json)
end
