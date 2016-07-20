json.array!(@trips) do |trip|
  json.extract! trip, :id, :tripname, :description, :start, :end
  json.url trip_url(trip, format: :json)
end
