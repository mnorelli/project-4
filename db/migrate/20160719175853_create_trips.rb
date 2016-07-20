class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :tripname
      t.text :description
      t.date :start
      t.date :end

      t.timestamps null: false
    end
  end
end
