json.array!(@trails) do |trail|
  json.extract! trail, :id, :trailname, :image, :coordinates
  json.url trail_url(trail, format: :json)
end
