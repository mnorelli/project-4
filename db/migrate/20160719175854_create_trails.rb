class CreateTrails < ActiveRecord::Migration
  def change
    create_table :trails do |t|
      t.string :trailname
      t.string :image
      t.string :coordinates

      t.timestamps null: false
    end
  end
end
